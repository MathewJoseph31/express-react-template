import React from 'react';
import './App.css';

class App extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   users: []
  };
 }

 async componentDidMount() {
  // Call self-hosted API to get users response
  const res = await fetch('/api/users');
  const users = await res.json();
  this.setState({
   users: users
  });
 }

render() {
  return (
   <div className="App">
    {this.state.users.map(user => (
     <p>{user}</p>
    ))}
   </div>
  );
 }
}

export default App;
