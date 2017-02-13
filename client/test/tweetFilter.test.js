import should from 'should'

import filter from '../src/tweetFilter'

describe('TweetFilter', function() {
    describe('#filter()', function() {
        it('should remove urls', function() {
            var preFilter = 'This is a url https://www.google.com'
            var postFilter = 'This is a url'
            filter(preFilter).should.eql(postFilter)
        })
        it('should remove short sentences', function() {
            var preFilter = 'Something reasonable is happening. Sad!'
            var postFilter = 'Something reasonable is happening.'
            filter(preFilter).should.eql(postFilter)
        })
        it('should convert to normal sentence case', function() {
            var preFilter = 'I AM SUPER ANGRY.'
            var postFilter = 'I am super angry.'
            filter(preFilter).should.eql(postFilter)
        })
        it('should remove exclamation points', function() {
            var preFilter = 'I am super angry!!!!!'
            var postFilter = 'I am super angry.'
            filter(preFilter).should.eql(postFilter)
        })
        it('should replace repeating question marks', function() {
            var preFilter = 'Are you serious??? Why would he do that???'
            var postFilter = 'Are you serious? Why would he do that?'
            filter(preFilter).should.eql(postFilter)
        })
    })
})
