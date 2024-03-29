import React, {useState, createContext} from "react";

export const UtilsContext = createContext();

export const UtilsContextProvider = props => {

    const handleFormChange = (event, setFormState) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    }

    const setInitialFormState = (data, setFormState)=>{
        let obj = {};
        data.forEach((item)=>Object.keys(item).forEach((key)=>obj[key]=item[key]));
        setFormState(obj)
    }

    const itemDelete = (id, bearerToken, url, callback)=>{
        let headers = new Headers();
        let urlencoded = new URLSearchParams();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", `Bearer ${bearerToken}`);
        urlencoded.append("id", id);
        let requestOptions = {
            method: 'DELETE',
            headers: headers,
            body: urlencoded
        };
        fetch(url, requestOptions)
            .then(response=>console.log(response))
            .then(response => callback(response,id))
            .catch(error => console.log('error', error));
    }

    const handleSubmit = (event, params)=>{
        let canProceed = true;
        let method = (params.method) ? params.method : 'POST';

        Object.keys(params.formState).forEach((key)=>{
            if(!params.formState[key] && !listContains(params.exceptions, key)){
                canProceed = false;
                params.setFeedback({active: true, message : 'Todos os campos são obrigatórios.', status:'error'});
            }
        })

        if(canProceed){
            let headers = new Headers();
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            headers.append("Authorization", `Bearer ${params.bearerToken}`);

            let urlencoded = new URLSearchParams();
            urlencoded.append("id", params.id)
            Object.keys(params.formState).forEach((key) => {
                if(params.labels[key]){
                    urlencoded.append(key, params.formState[key])
                }
            });

            let requestOptions = {
                method: method,
                headers: headers,
                body: urlencoded,
            };

            fetch(params.url, requestOptions)
                .then(data => params.setMyStates(data))
                .catch(error => console.log('error', error));
        }
    }

    const getElementById = (list, id)=>{
        for(const item of list){
            if(item.id === id){ return item;}
        }
        return '';
    }

    const removeItemFromList = (list, id)=>{
        return list.filter((item)=> item.id !== id);
    }

    const listContains = (list, item)=>{
        let exists = false;
        list.forEach((listItem)=>{
            if(item.trim()===listItem.trim()){
                exists = true;
            }
        })
        return exists;
    }

    const obj = {
        listContains : listContains,
        handleFormChange : handleFormChange,
        setInitialFormState : setInitialFormState,
        itemDelete : itemDelete,
        removeItemFromList : removeItemFromList,
        getElementById : getElementById,
        handleSubmit : handleSubmit
    }

    const [functions, setFunctions] = useState(obj);

    return (
        <UtilsContext.Provider value={[functions, setFunctions]}>
            {props.children}
        </UtilsContext.Provider>
    );
};