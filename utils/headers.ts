const headers = (access_token: string): any => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`,
  }
}

export default headers
