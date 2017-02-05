import React, { PropTypes } from 'react'

export default function Money(props) {
    var currencySymbol
      , amount

    switch (props.currency) {
        case 'GBP':
            currencySymbol = '£'
        default:
            currencySymbol = '£'
    }

    amount = Number(props.amount)
    if (props.decimalPlaces) {
        amount = amount.toFixed(props.decimalPlaces)
    } else {
        amount = amount.toFixed(2)
    }

    return (
        <span>
            {currencySymbol}{amount}
        </span>
    )
}

Money.propTypes = {
    currency: PropTypes.oneOf(['GBP'])
  , amount: PropTypes.string
}
