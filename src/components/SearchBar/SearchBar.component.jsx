import { TextField, Grid, InputAdornment,Divider,FormControl,ClickAwayListener,InputLabel, NativeSelect } from '@mui/material';
import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState, useEffect } from 'react';
import { usePet } from '../../context/PetContext.js';
import { useUser } from '../../context/UserContext.js';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({searchType}) => {
    const [focus,setFocus] = useState(false)
    const [extendedSearch,setExtendedSearch] = useState(false)
    const [heightsArr,setHeightsArr] = useState([])
    const [weightsArr,setWeightsArr] = useState([])
    const [minHeight,setMinHeight] = useState("")
    const [maxHeight,setMaxHeight] = useState("")
    const [minWeight,setMinWeight] = useState("")
    const [maxWeight,setMaxWeight] = useState("")
    const [nameInput,setNameInput] = useState("")
    const [typeInput,setTypeInput] = useState("")
    const [adoptionStatusInput,setAdoptionStatusInput] = useState("")

    const { user, openModal, setPetSearchValues } = useUser()
    const { searchPets, selectPet } = usePet()
    const navigate = useNavigate()

    const handleFocus = (bool) => {
        setFocus(bool)
    }

    const handleExtendedSearch = (bool) => {
        setExtendedSearch(bool)
    }

    const handleMinHeight = (value) => {
        setMinHeight(value)
    }

    const handleMaxHeight = (value) => {
        setMaxHeight(value)
    }

    const handleMinWeight = (value) => {
        setMinWeight(value)
    }

    const handleMaxWeight = (value) => {
        setMaxWeight(value)
    }

    const handleAdoptionStatus = (value) => {
        setAdoptionStatusInput(value)
    }

    const handleNameInput = (value) => {
        setNameInput(value)
    }

    const renderHeight = () => {
        const acc = [null]
        for(let x = 10 ; x <= 120; x = x + 10) {
        acc.push(x)
        }
        setHeightsArr(acc)
    }

    const renderWeight = () => {
        const acc = [null]
        for(let x = 1 ; x <= 30; x = x + 1) {
        acc.push(x)
        }
        setWeightsArr(acc)
    }

    const searchAPet = () => {
        switch(searchType) {
            case "petSearch": 
                selectPet(null)
                setPetSearchValues({user,typeInput, nameInput, adoptionStatusInput, minHeight, maxHeight, minWeight, maxWeight})
                searchPets(user,typeInput, nameInput, adoptionStatusInput, minHeight, maxHeight, minWeight, maxWeight);
                navigate("/search");
                handleExtendedSearch(false);
                break;
            case "petEdit":
                selectPet(null)
                setPetSearchValues({user,typeInput, nameInput, adoptionStatusInput, minHeight, maxHeight, minWeight, maxWeight})
                searchPets(user,typeInput, nameInput, adoptionStatusInput, minHeight, maxHeight, minWeight, maxWeight);
            default:
            break;
        }
    }

    useEffect(() => {
        renderHeight()
        renderWeight()
    },[])


    return (
        //     <ClickAwayListener
        // onClickAway={() => {
        // if(extendedSearch) {
        // handleExtendedSearch(false)
        // }
        // }
        // }>
        <Grid 
        container sx={{
            zIndex:10,position:"relative",flexGrow:1}}>
            <Grid item 
                xs={12}
                sx={{flexGrow:1,display:"flex"}}>
                <TextField
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
                value={typeInput}
                onChange={(e) => {setTypeInput(e.target.value)}}
                InputProps={
                focus || extendedSearch ? {
                startAdornment: (
                    <InputAdornment position="start"
                    onMouseDown={(e) => {handleExtendedSearch(!extendedSearch)
                    return e.preventDefault()}}
                    sx={{cursor:"pointer","&:hover":{color:"#14445a"}}}>
                        <SettingsInputComponentRoundedIcon
                         />
                        <Divider
                    sx={{height:"25px",paddingLeft:1}} orientation="vertical"/>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchRoundedIcon 
                            onMouseDown={() => {
                                user ? searchAPet()
                                : 
                                openModal()
                            }}
                            sx={{cursor:"pointer","&:hover":{color:"#14445a"}}}/>
                        <Divider
                            sx={{height:"25px"}} orientation="vertical"/>
                        <CloseIcon sx={{cursor:"pointer","&:hover":{color:"#14445a"}}}/>
                    </InputAdornment>
                )
                }: null}
                size="small" sx={{flexGrow:1, my:1}} 
                color="secondary" 
                label="Search for a pet"
                placeholder="Search for a pet type. Ex:(dog,cat...)" 
                variant="outlined"/>
            </Grid>
            {extendedSearch &&
            <Grid container
                gap={1}
                sx={{
                padding:1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:"#fff",position:"absolute",top:"56px",
                borderRadius:"0 0 4px 4px",
                paddingBottom:2
            }}
                rowSpacing={1}>
                <Grid sx={{                    
                    display:"flex",justifyContent:"center",
                    flexGrow:1, height:"45px"}} item xs={12} sm={5.8}>
                    <TextField
                    size="small"
                    color="secondary"
                    variant="outlined"
                    value={nameInput}
                    placeholder="Name"
                    onChange={(e) => handleNameInput(e.target.value)}
                    sx={{flexGrow:1}}/>
                </Grid>
                <Grid sx={{                    
                    display:"flex",justifyContent:"center"}}item xs={12} sm={5.8}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Adoption Status
                        </InputLabel>
                        <NativeSelect
                            onChange={(e) => handleAdoptionStatus(e.target.value)}
                            size="small"
                            color="secondary"
                            value={adoptionStatusInput}
                            inputProps={{
                            name: 'minHeight',
                            id: 'uncontrolled-native',
                            }}
                        >
                        <>
                            <option color="secondary" value={null}></option>
                            <option color="secondary" value={"Foster"}>Foster</option>
                            <option color="secondary" value={"Adopt"}>Adopt</option>
                        </>                         
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid sx={{                    
                    display:"flex",justifyContent:"center",
                    flexGrow:1}} item gap={1} xs={12} sm={5.8}>
                      <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Min Height
                        </InputLabel>
                        <NativeSelect
                            onChange={(e) => handleMinHeight(e.target.value)}
                            size="small"
                            color="secondary"
                            value={minHeight}
                            inputProps={{
                            name: 'minHeight',
                            id: 'uncontrolled-native',
                            }}
                        >
                        {   
                            heightsArr.map((height,index) => {
                                console.log(height)
                                return <option key={index} color="secondary" value={height}>{height}</option>
                            })
                        }
                          
                        </NativeSelect>
                    </FormControl>
                      <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Max Height
                        </InputLabel>
                        <NativeSelect
                            onChange={(e) => handleMaxHeight(e.target.value)}
                            size="small"
                            color="secondary"
                            value={maxHeight}
                            inputProps={{
                            name: 'maxHeight',
                            id: 'uncontrolled-native',
                            }}
                        >
                        {   
                            heightsArr.map((height,index) => {
                                console.log(height)
                                return <option key={index} color="secondary" value={height}>{height}</option>
                            })
                        }

                            
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid sx={{                    
                    display:"flex",justifyContent:"center"}}item xs={12} sm={5.8}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Min Weight
                        </InputLabel>
                        <NativeSelect
                            onChange={(e) => handleMinWeight(e.target.value)}
                            size="small"
                            color="secondary"
                            value={minWeight}
                            inputProps={{
                            name: 'minWeight',
                            id: 'uncontrolled-native',
                            }}
                        >
                        {   
                            weightsArr.map((height,index) => {
                                console.log(height)
                                return <option key={index} color="secondary" value={height}>{height}</option>
                            })
                        }
                          
                        </NativeSelect>
                    </FormControl>
                      <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Max Weight
                        </InputLabel>
                        <NativeSelect
                            size="small"
                            color="secondary"
                            value={maxWeight}
                            onChange={(e) => handleMaxWeight(e.target.value)}
                            inputProps={{
                            name: 'maxWeight',
                            id: 'uncontrolled-native',
                            }}
                        >
                        {   
                            weightsArr.map((weight,index) => {
                                console.log(weight)
                                return <option key={index} color="secondary" value={weight}>{weight}</option>
                            })
                        }

                            
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
            }
        </Grid>
        // </ClickAwayListener>
    )
}

export default SearchBar
