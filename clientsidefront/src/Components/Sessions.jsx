import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';



export default function Sessions() {
    const [state, setState] = useState({
      data: [],
    });
    const getData = async () => {
      try {
        let response = await axios.get("http://localhost:5000/sessions");
        setState({ data: response.data });
        console.log("this is data from backend", response.data);
        // console.log("this is data"+ response.data); manajmch najma3 chaine m3a array
      } catch (err) {
        console.log("Error getting cards");
      }
    };

    useEffect(() => {
      getData();
    }, []);
  return (
    <div>
      <div style={{ backgroundColor: "#F4FAFB" }}>
        <div className="d-flex justify-content-center py-5 align-items-center flex-wrap">
          <h1 style={{ fontFamily: "Brittany Signature" }}>Our Sessions</h1>
          <div
            style={{
              height: "5px",
              width: "80px",
              backgroundColor: "rgb(66, 177, 188)",
              marginRight: "42px",
            }}
          ></div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-5 p-5 justify-content-center">
        {state.data.map((card) => (
                   <Card sx={{ maxWidth: 345 }}>
                   <CardMedia
                     component="img"
                     alt="green iguana"
                     height="140"
                     image={card.imageURL}
                   />
                   <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                     {card.title}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                     {card.description}
                     </Typography>
                   </CardContent>
                   <CardActions size="small">
                   <Link href={`session/${card.id}`} underline="hover">
        {'See more'}
      </Link>    </CardActions>
                 </Card>
          // <Card style={{ width: "20rem", height: "32rem" }}>
          //   <Card.Img
          //     variant="top"
          //     src={card.imageURL}
          //     style={{ height: "12rem" }}
          //     className="thumb-img"
          //   />
          //   <Card.Body>
          //     <Card.Title style={{ width: "18rem", height: "2rem" }}>
          //       {card.title}
          //     </Card.Title>
          //     <Card.Text
          //       style={{
          //         width: "18rem",
          //         height: "12rem",
                 
          //       }}
          //     >
          //       {card.description}
          //     </Card.Text>
          //     <div
          //       className="d-flex justify-content-around px-5"
                
          //     >
          //       <Link to={`session/${card.id}`} className="btn btn-primary">
          //           See more
          //         </Link>

             
          //     </div>
          //   </Card.Body>
          // </Card>
        ))}
      </div>
    </div>

    
  );
}







// import React, { Component } from 'react'

// export default class Sessions extends Component {
//   render() {
//     return (
//       <div>
//         <div style={{ backgroundColor: "#F4FAFB" }}>
//           <div className="d-flex justify-content-center py-5 align-items-center flex-wrap">
//             <h1 style={{ fontFamily: "Brittany Signature" }}>Our Sessions</h1>
//             <div
//               style={{
//                 height: "5px",
//                 width: "80px",
//                 backgroundColor: "rgb(66, 177, 188)",
//                 marginRight: "42px",
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
