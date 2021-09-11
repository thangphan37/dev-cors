import * as React from 'react'

function WithoutCredentials() {
  React.useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY}/without-credentials`,
      )
      const resJson = await data.json()

      // do some stuff in here.
    }

    fetchData()
  }, [])
  return (
    <div>
      <h1>Without Credentials</h1>
    </div>
  )
}

export default WithoutCredentials
