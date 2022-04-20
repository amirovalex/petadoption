import './MessageWindow.styles.css'
import {CardMedia,Typography,CardContent,Card} from '@mui/material'


const MessageWindow = ({message,url}) => {

  return (
    <Card sx={{display:"flex",borderRadius:3,
    cursor:"pointer",
    backgroundColor: "rgba(81, 95, 102,0.7)",
    "&:hover":{backgroundColor:"#515f66"},
    boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)"
     }}>
        <CardContent >
            <Typography
            color="#fff"
            sx={{fontWeight:"bolder"}}
            >
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
