import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";


export const fetchWeatherData =createAsyncThunk('weatherApi/fetchWeather',async()=>{
    const response =await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?lat=30.0445&lon=31.2388&appid=ccc36c4681abd5c3fc7422495d1c215c'
    )
    
    const tempInfo={
        temp:Math.round(response.data.main.temp - 273),
        minTemp:Math.round(response.data.main.temp_min - 273),
        maxTemp:Math.round(response.data.main.temp_max - 273),
        humidity:response.data.main.humidity,
        feelsLike:Math.round(response.data.main.feels_like -273),
        description:response.data.weather[0].description,
        icon:response.data.weather[0].icon
    };

    return tempInfo;
})




const initialState = {
    result:'empty',
    weather:{},
    isLoading:false
}

export const weatherSlice =createSlice({
    name:'weather',
    initialState,
    reducers:{
        changeApi:(currentState,action)=>{
            currentState.value="changed api"
        }
    },

    extraReducers: (builder) => {
    builder
        .addCase(fetchWeatherData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.weather = action.payload;
        })
        .addCase(fetchWeatherData.rejected, (state) => {
            state.isLoading = false;
        });
}
});


export const {changeApi}=weatherSlice.actions;
export default weatherSlice.reducer;