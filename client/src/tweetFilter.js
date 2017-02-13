import sentenceTools from 'sentence-tools'
import changeCase from 'change-case'

// TODO: lots of common cases not properly handled such as:
// @mentions
// apostraphes and commas
// lots of capitalization special cases
export default function filter(text) {
    var newArrayOfSentences = []
      , newText

    // Remove urls
    newText = text.replace(/https?:\/\/\S+/, '')

    sentenceTools.tokenize(newText).forEach(sentence => {
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
