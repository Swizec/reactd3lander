import React from 'react'

const EmailForm = () => {
  return (
    <div>
      <form
        action="https://www.getdrip.com/forms/5362865/submissions"
        method="post"
        target="_blank"
        data-drip-embedded-form="5362865"
        >
        <input
            type="text"
            placeholder="Enter your email"
            label="Email Address"
            name="fields[email]"
            className="form-control"
        />
     </form>
    </div>
  )
}

export default EmailForm
