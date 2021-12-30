import './MessageWindow.styles.css'
import {CardMedia,Typography,CardContent,Card} from '@mui/material'


const MessageWindow = ({message,url}) => {

  return (
    <Card sx={{ maxWidth: "80%",display:"flex",borderRadius:3,
    backgroundColor: "rgba(81, 95, 102,0.7)"
     }}>
        <CardContent >
            <Typography
            color="#fff">
                {message}
            </Typography>
        </CardContent>
        {url &&
            <CardMedia
            component="img"
            sx={{width:150}}
            image={url}
            alt="dog image"
            />
        }  
    </Card>
  );
}

export default MessageWindow
