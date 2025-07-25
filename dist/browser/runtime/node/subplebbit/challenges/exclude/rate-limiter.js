import QuickLRU from "quick-lru";
import { isVote, isReply, isPost, isCommentEdit, isCommentModeration, isSubplebbitEdit, testPublicationType } from "./utils.js";
import { RateLimiter } from "limiter-es6-compat";
import { derivePublicationFromChallengeRequest } from "../../../../../util.js";
// each author could have 20+ rate limiters each if the sub has
// several rate limit rules so keep a large cache
const rateLimiters = new QuickLRU({ maxSize: 50000 });
const getPublicationType = (request) => isPost(request)
    ? "post"
    : isReply(request)
        ? "reply"
        : isVote(request)
            ? "vote"
            : isCommentEdit(request)
                ? "commentEdit"
                : isCommentModeration(request)
                    ? "commentModeration"
                    : isSubplebbitEdit(request)
                        ? "subplebbitEdit"
                        : undefined;
const getRateLimiterName = (exclude, publication, publicationType, challengeSuccess) => `${publication.author.address}-${exclude.rateLimit}-${publicationType}-${challengeSuccess}`;
const getOrCreateRateLimiter = (exclude, publication, publicationType, challengeSuccess) => {
    if (typeof exclude.rateLimit !== "number")
        throw Error("Can't create a RateLimiter without exclude.rateLimit");
    const rateLimiterName = getRateLimiterName(exclude, publication, publicationType, challengeSuccess);
    let rateLimiter = rateLimiters.get(rateLimiterName);
    if (!rateLimiter) {
        rateLimiter = new RateLimiter({ tokensPerInterval: exclude.rateLimit, interval: "hour", fireImmediately: true });
        //@ts-expect-error
        rateLimiter.name = rateLimiterName; // add name for debugging
        rateLimiters.set(rateLimiterName, rateLimiter);
    }
    return rateLimiter;
};
const addFilteredRateLimiter = (exclude, publication, publicationType, challengeSuccess, filteredRateLimiters) => {
    filteredRateLimiters[getRateLimiterName(exclude, publication, publicationType, challengeSuccess)] = getOrCreateRateLimiter(exclude, publication, publicationType, challengeSuccess);
};
const getRateLimitersToTest = (exclude, request, challengeSuccess) => {
    // TODO I think we need to change this
    const publication = derivePublicationFromChallengeRequest(request);
    // get all rate limiters associated with the exclude (publication type and challengeSuccess true/false)
    const filteredRateLimiters = {};
    if (testPublicationType(exclude.publicationType, request)) {
        const publicationType = getPublicationType(request);
        if (publicationType) {
            addFilteredRateLimiter(exclude, publication, publicationType, challengeSuccess, filteredRateLimiters);
        }
    }
    return filteredRateLimiters;
};
const testRateLimit = (exclude, request) => {
    // will come back here later
    if (exclude?.rateLimit === undefined || !testPublicationType(exclude.publicationType, request)) {
        // early exit based on exclude type and publication type
        return true;
    }
    // if rateLimitChallengeSuccess is undefined or true, only use {challengeSuccess: true} rate limiters
    let challengeSuccess = true;
    if (exclude.rateLimitChallengeSuccess === false) {
        challengeSuccess = false;
    }
    // check all the rate limiters that match the exclude and publication type
    const rateLimiters = getRateLimitersToTest(exclude, request, challengeSuccess);
    // if any of the matching rate limiter is out of tokens, test failed
    for (const rateLimiter of Object.values(rateLimiters)) {
        const tokensRemaining = rateLimiter.getTokensRemaining();
        // token per action is 1, so any value below 1 is invalid
        if (tokensRemaining < 1)
            return false;
    }
    return true;
};
const getRateLimitersToAddTo = (excludeArray, request, challengeSuccess) => {
    // get all rate limiters associated with the exclude (publication type and challengeSuccess true/false)
    const filteredRateLimiters = {};
    const publication = derivePublicationFromChallengeRequest(request);
    for (const exclude of excludeArray) {
        if (exclude?.rateLimit === undefined) {
            continue;
        }
        const publicationType = getPublicationType(request);
        if (publicationType) {
            addFilteredRateLimiter(exclude, publication, publicationType, challengeSuccess, filteredRateLimiters);
        }
        if (request.commentEdit) {
            addFilteredRateLimiter(exclude, publication, "commentEdit", challengeSuccess, filteredRateLimiters);
        }
        if (request.commentModeration) {
            addFilteredRateLimiter(exclude, publication, "commentModeration", challengeSuccess, filteredRateLimiters);
        }
        if (request.subplebbitEdit) {
            addFilteredRateLimiter(exclude, publication, "subplebbitEdit", challengeSuccess, filteredRateLimiters);
        }
    }
    return filteredRateLimiters;
};
const addToRateLimiter = (subplebbitChallenges, request, challengeSuccess) => {
    if (!subplebbitChallenges) {
        // subplebbit has no challenges, no need to rate limit
        return;
    }
    if (!Array.isArray(subplebbitChallenges)) {
        throw Error(`addToRateLimiter invalid argument subplebbitChallenges '${subplebbitChallenges}' not an array`);
    }
    if (typeof challengeSuccess !== "boolean") {
        throw Error(`addToRateLimiter invalid argument challengeSuccess '${challengeSuccess}' not a boolean`);
    }
    // get all exclude items from all subplebbit challenges
    const excludeArray = [];
    for (const subplebbitChallenge of subplebbitChallenges) {
        for (const exclude of subplebbitChallenge?.exclude || []) {
            excludeArray.push(exclude);
        }
    }
    if (!excludeArray.length) {
        // no need to add to rate limiter if the subplebbit has no exclude rules in any challenges
        return;
    }
    const rateLimiters = getRateLimitersToAddTo(excludeArray, request, challengeSuccess);
    for (const rateLimiter of Object.values(rateLimiters)) {
        rateLimiter.tryRemoveTokens(1);
    }
};
export { addToRateLimiter, testRateLimit };
//# sourceMappingURL=rate-limiter.js.map