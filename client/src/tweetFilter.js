import sentenceTools from 'sentence-tools'
import changeCase from 'change-case'

// TODO: lots of common cases not properly handled such as:
// links
// @mentions
export default function filter(text) {
    var newArrayOfSentences = []
      , newText

    sentenceTools.tokenize(text).forEach(sentence => {
        // Ignore sentences less than 3 words long
        if (sentenceTools.countWords(sentence) < 3) {
            return
        }

        // Add a properly capitalized sentence to the array
        newArrayOfSentences.push(changeCase.sentenceCase(sentence))
    })

    newText = newArrayOfSentences.join('. ')
    newText = newText + '.'

    // Replace exclamation points with a period
    newText = newText.replace(/\!+/g, '.')

    // Only allow a single question mark
    newText = newText.replace(/\?+/g, '?')

    return newText
}
