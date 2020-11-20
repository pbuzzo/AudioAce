import React from 'react'

export default function Hero({ children, hero }) {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}

// assigning default props
Hero.defaultProps ={
    hero:'defaultHero'
};