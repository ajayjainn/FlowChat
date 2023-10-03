import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = () => {

  return (
    <>
      <h3 className='text-center mt-4 mb-4'>Welcome to Flow Chat</h3>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Card className='me-4' border="secondary" style={{ width: '18rem',height:'15rem' }}>
          <Card.Header>Have a room code?</Card.Header>
          <Card.Body>
            <Card.Title>Join an existing Chat Room</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
        <br/>

        <Card border="dark" style={{ width: '18rem',height:'15rem'}}>
          <Card.Header>No room code?</Card.Header>
          <Card.Body>
            <Card.Title>Create your own Chat Room</Card.Title>
            <Card.Text>
            <Button variant="primary">Create a room</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default Home