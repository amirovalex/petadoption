import { TextField, Grid, InputAdornment,Divider,FormControl,ClickAwayListener,InputLabel, NativeSelect } from '@mui/material';
import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState, useEffect, useCallback } from 'react';
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
    const [extendedSearchNode, setExtendedSearchNode] = useState(null)
    const { user, openModal, setPetSearchValues } = useUser()
    const { searchPets, selectPet } = usePet()
    const navigate = useNavigate()

    const extendSearch = () => {
        setExtendedSearch(true)
    }

    const closeExtendedSearch = () => {
        setExtendedSearch(false)
    }

    const handleBlur = useCallback(
    (e) => {
      const currentTarget = e.currentTarget;
      console.log(e.target)
      console.log(currentTarget)
      console.log(window.getSelection())
      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container

        //check if was clicked out of the children node
        // if (document.activeElement) {
        //     closeExtendedSearch();
        // }

        if (!currentTarget.contains(extendedSearchNode)) {
            setExtendedSearchNode(null)
            closeExtendedSearch();
            console.log('close')
        }
    });
},
    [closeExtendedSearch]
  );


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
                navigate(`/search?type=${typeInput}`);
                handleExtendedSearch(false);
                break;
            case "petEdit":
                selectPet(null)
                // setPetSearchValues({user,typeInput, nameInput, adoptionStatusInput, minHeight, maxHeight, minWeight, maxWeight})
                searchPets(user,typeInput, nameInput, adoptionStatusInput, minHeight, maxHeight, minWeight, maxWeight);
            default:
            break;
        }
    }

    useEffect(() => {
        renderHeight()
        renderWeight()
    },[])

    const styles = theme => ({
    notchedOutline: {
        border: "2px solid #14445A !important",
    }
    });

    return (
        <ClickAwayListener onClickAway={closeExtendedSearch}>
        <Grid
        container sx={{

            zIndex:10,position:"relative",flexGrow:1}}>
            <Grid item 
                xs={12}
                sx={{flexGrow:1,display:"flex"}}>
                <TextField
                color="primary"
                focused
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}
                value={typeInput}
                onChange={(e) => {
                    setTypeInput(e.target.value)}}
                InputProps={
                focus || extendedSearch ? {
                startAdornment: (
                    <InputAdornment position="start"
                    onMouseDown={(e) => {
                        setExtendedSearchNode(e.currentTarget)
                        handleExtendedSearch(!extendedSearch)
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
                }: {
                classes: {
                  notchedOutline: styles().notchedOutline
                },
                }}
                size="small" sx={{flexGrow:1, my:1}} 
                color="secondary" 
                label="Search for a pet"
                placeholder="Search for a pet type. Ex:(dog,cat...)" 
                variant="outlined"/>
            </Grid>
            {extendedSearch &&
            <Grid 
                // onClick={(e) => {
                //     console.log(e.currentTarget)
                // }}
                container
                gap={1}
                sx={{
                borderBottom:"1px solid rgb(200,200,200)",
                borderLeft:"1px solid rgb(200,200,200)",
                borderRight:"1px solid rgb(200,200,200)",
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
                            IconComponent="span"
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
                            Min Height(cm)
                        </InputLabel>
                        <NativeSelect
                            IconComponent="span"
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
                                return <option key={index} color="secondary" value={height}>{height}</option>
                            })
                        }
                          
                        </NativeSelect>
                    </FormControl>
                      <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Max Height(cm)
                        </InputLabel>
                        <NativeSelect
                        IconComponent="span"
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
                            Min Weight(kg)
                        </InputLabel>
                        <NativeSelect
                        IconComponent="span"
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
                            weightsArr.map((weight,index) => {
                                return <option key={index} color="secondary" value={weight}>{weight}</option>
                            })
                        }
                          
                        </NativeSelect>
                    </FormControl>
                      <FormControl fullWidth>
                        <InputLabel variant="standard" color="secondary" htmlFor="uncontrolled-native">
                            Max Weight(kg)
                        </InputLabel>
                        <NativeSelect
                        IconComponent="span"
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
                                return <option key={index} color="secondary" value={weight}>{weight}</option>
                            })
                        }

                            
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
            }
        </Grid>
        </ClickAwayListener>
    )
}

export default SearchBar
