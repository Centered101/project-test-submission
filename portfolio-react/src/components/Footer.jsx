import React from 'react'

function Footer() {
    return (
        <footer role='complementary' className='w-full flex  p-6'>
            <p>&copy;&#160;{new Date().getFullYear()}
                <span translate='no'>&#160;Centered01</span>&#160;—&#160;All&#160;Rights&#160;Reserved.
            </p>
            <header />
        </footer>
    )
}

export default Footer
