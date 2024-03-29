import React, {useContext, useState} from "react";
import {BaseContext} from "../../ContextProviders/BaseContextProvider";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {useParams} from "react-router";
import Feedback from "../../Partials/Feedback";
import Loading from "../../Loading";
import useGetEntity from "../../Hooks/useGetEntity";

const AdminUpdateCategory = ()=>{
    const [base] = useContext(BaseContext);
    const [utils] = useContext(UtilsContext);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const [formState, setFormState] = useState(null);
    const {id} = useParams();
    const bearerToken = base.credentials.accessToken;
    const exceptions = ['created_at', 'updated_at'];
    const labels = { name : 'Nome'};
    let rows;
    let output = <Loading/>;

    const deps = {
        bearerToken : bearerToken,
        url : `${base.urls.categoryDetail}/${id}`,
        setInitialFormState : utils.setInitialFormState,
        setInitData : setFormState,
    }

    useGetEntity(deps)

    const setMyStates = (result)=>{
        if(result.status!==200){
            setFeedback({active: true, message : 'Houve um erro na atualização dos dados.', status:'error'});
        }else{
            setFeedback({active: true, message : 'Dados atualizados com sucesso!', status:'success'});
            setDataUpdated(true);
        }
    }

    if(formState && !dataUpdated){
        const params = {
            url : base.urls.categoryUpdate,
            labels : labels,
            exceptions : exceptions,
            formState : formState,
            setFeedback :setFeedback,
            bearerToken : bearerToken,
            id : id,
            method : 'PUT',
            setMyStates : setMyStates
        }

        rows = Object.keys(formState).map((key)=>{
            if(labels[key]){
                return (
                    <div className="mb-3" key={key}>
                        <label htmlFor="name"><strong>{labels[key]}:</strong></label><br/>
                        <input type="text" name={key} className="form-control" value={formState[key]} onChange={(e)=>utils.handleFormChange(e, setFormState)}/>
                    </div>
                )
            }else{
                return '';
            }
        })

        output = (
            <>
                <Feedback params={feedback}/>
                {rows}
                <Feedback params={feedback}/>
                <button onClick={(e)=>utils.handleSubmit(e, params)} type="submit" className="btn btn-primary btn-block mt-3">SALVAR</button>
            </>
        );
    }else if(formState && dataUpdated){
        window.scrollTo(0, 0);
        output = <Feedback params={feedback}/>
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-5">Editar Dados</h2>
                    {output}
                </div>
            </div>
        </div>
    )
}

export default AdminUpdateCategory;