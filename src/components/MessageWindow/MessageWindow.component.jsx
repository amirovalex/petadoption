import './MessageWindow.styles.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,Box } from '@mui/material';

const MessageWindow = ({message,url}) => {

  return (
    <Card sx={{ maxWidth: 345,display:"flex",borderRadius:3 }}>
        <CardContent >
            <Typography variant="body2" color="text.secondary">
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
