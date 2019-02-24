import React from 'react'

const EmailSubmit = () => {
  return (
    <div>
      <form
        action="https://www.getdrip.com/forms/5362865/submissions"
        method="post"
        target="_blank"
        data-drip-embedded-form="5362865"
        >
        <input
            type="submit"
            name="submit"
            value="Sign Up"
            data-drip-attribute="sign-up-button"
            className="btn"
        />
      </form>
    </div>
  )
}

export default EmailSubmit
