import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import CloudIcon from '@mui/icons-material/Cloud';
//extrnal library
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/ar' ;
import { useSelector ,useDispatch} from 'react-redux';
import { fetchWeatherData } from '../features/weather/weatherSlice';


export default function DailyWeather(){
    const { t, i18n } = useTranslation();
    const [lang,setLang]=useState("en")
    const [dateAndTime,setDateAndTime]=useState(null);
    const isLoading = useSelector((state)=>state.weather.isLoading);
    const tempData = useSelector((state)=>state.weather.weather);
    const dispatch =useDispatch();
    const handlerLang =()=>{
        if(lang === "en"){
            setLang("ar");
        }else{
            setLang("en")
        }
    };

    useEffect(()=>{
        dispatch(fetchWeatherData());
    },[dispatch])


    useEffect(()=>{
        i18n.changeLanguage(lang);
        moment.locale(lang);
        
    },[lang,i18n])

    useEffect(()=>{
        const interval = setInterval(()=>{
            setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
        },1000)
        return ()=>{
            clearInterval(interval);
        }
    },[])

    return(
        <div  style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',width:'100%',direction:lang==="ar"?'rtl':'ltr'}}>
            <Card className='card' sx={{ width: '70%',backgroundColor:"rgb(227, 242, 253,0.3)",color:'#fff' }}>
                <CardContent >
                    <Box className="card-head" display="flex" alignItems="flex-end" >
                        <Typography variant="h2"  mr={1}>
                            {t("Cairo")}
                        </Typography>
                        <Typography variant="h5">
                            {dateAndTime}
                        </Typography>
                    </Box>
                    <hr />
                    <Box   sx={{ flexGrow: 1 ,boxShadow:"0px 0px 5px rgb(0 ,0 ,0,0.3)",padding:'5px'}}>
                        <Grid  container spacing={2}>
                            <Grid  size={8} >
                                <Typography  className='temp-size' variant="h1" component='div' sx={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                                    {tempData.temp} °C {isLoading && <CircularProgress size={30} sx={{color:'#fff',marginLeft:'5px'}} />}
                                    <img src={`https://openweathermap.org/img/wn/${tempData.icon}@2x.png`} alt=''/>
                                </Typography>
                                <Typography variant="h6" textAlign={'center'} >
                                    {t(tempData.description)}
                                </Typography>
                            
                                <Box  className="temp" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                                    <Typography className='tep' variant="h6">{t("min")}:{tempData.minTemp} °C</Typography>
                                    <Divider orientation="vertical" flexItem sx={{ bgcolor: '#fff', mx: 1 }} />
                                    <Typography variant="h6">{t("max")}:{tempData.maxTemp} °C</Typography>
                                </Box>
                                
                            </Grid>
                            <Grid size={4}>
                                <Typography  component='div' style={{display:'flex',alignItems:'center',justifyContent:"center"}}>
                                    <CloudIcon className='icon-size' sx={{fontSize:'130px'}} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{flexGrow:1,marginTop:'20px',textAlign:'center'}}>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Typography  component='div' style={{boxShadow:"0px 0px 5px rgb(0 ,0 ,0,0.3)",padding:'5px',height:'90px'}}>
                                    <Typography variant='h5'>
                                        {t("Humidity")}
                                    </Typography>
                                    <Typography variant='h4'>
                                        {tempData.humidity} %
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid size={6} >
                                <Typography  component='div' style={{boxShadow:"0px 0px 5px rgb(0 ,0 ,0,0.3)",padding:'5px',height:'90px'}}>
                                    <Typography variant='h5'>
                                        {t("Feels Like")}
                                    </Typography>
                                    <Typography variant='h4'>
                                        {tempData.feelsLike}°C
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
            <div style={{marginTop:'5px'}}>
                <Button variant="text" style={{color:'#fff',fontSize:'20px'}} onClick={handlerLang} >{lang==="en"?"Arabic":"انجليزى"}</Button>
            </div>
        </div>
    )
}