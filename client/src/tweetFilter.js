import sentenceTools from 'sentence-tools'

// TODO: lots of common cases not properly handled such as:
// @mentions
// apostraphes and commas
// lots of capitalization special cases
export default function filter(text) {
    var newArrayOfSentences = []
      , newText

    // Remove urls
    newText = text.replace(/https?:\/\/\S+/, '')

    // Replace exclamation points with a period
    newText = newText.replace(/\!+/g, '.')

    // Only allow a single question mark
    newText = newText.replace(/\?+/g, '?')

    sentenceTools.tokenize(newText).forEach(sentence => {
        // Ignore sentences less than 3 words long
        if (sentenceTools.countWords(sentence) < 3) {
            return
        }

        // Add a properly capitalized sentence to the array
        sentence = toSentenceCase(sentence).trim()

        newArrayOfSentences.push(toSentenceCase(sentence))
    })

    newText = newArrayOfSentences.join(' ')

    return newText
}

function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
}
