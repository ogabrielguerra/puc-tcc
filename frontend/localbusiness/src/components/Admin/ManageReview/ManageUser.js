import React, {useContext, useState} from "react";
import {UtilsContext} from "../../ContextProviders/UtilsContextProvider";
import {CommonCredentials, CommonUrls} from "../../Common";
import Loading from "../../Loading";
import TableActions from "../../Partials/TableActions";
import MasterTable from "../../Partials/MasterTable";
import Feedback from "../../Partials/Feedback";
import useGetEntity from "../../Hooks/useGetEntity";

const ManageUser = ()=>{
    const [utils] = useContext(UtilsContext);
    const [user, setUser] = useState(null);
    const [feedback, setFeedback] = useState({active: false, message : '', status : ''});
    const bearerToken = CommonCredentials.accessToken;
    let output;

    const deps = {
        bearerToken : bearerToken,
        url : CommonUrls.userList,
        setInitialFormState : setUser,
        setInitData : null,
    }

    useGetEntity(deps);

    const processItemDelete = (response, id)=>{
        let updatedList = utils.removeItemFromList(user, id);
        setUser(updatedList);
        setFeedback({active: true, message : 'Item removido com sucesso!', status:'success'});
    }

    if(user) {
        let tableLabels = [
            ['NOME',40],
            ['EMAIL',40],
            ['AÇÕES',20]
        ];

        let rows = user.map((item) => {
            return (
                <tr key={item.id}>
                    <td width="24%">{item.name}</td>
                    <td width="24%">{item.email}</td>
                            <TableActions
                                id={item.id}
                                add='/admin/user/add/'
                                view="/admin/user/"
                                edit="/admin/user/update/"
                                itemDeleteCallback={utils.itemDelete}
                                processItemDeleteCallback={processItemDelete}
                                urlItemDelete={CommonUrls.userDelete}
                                bearerToken={bearerToken}
                            />
                </tr>
            )
        })

        output = (
                    <div className="table-responsive">
                        <MasterTable labels={tableLabels} rows={rows}/>
                    </div> )

    }else{
        output = <Loading/>
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12  pt-5">
                    <h2>Gerenciar Usuários</h2>
                    <Feedback params={feedback}/>
                    {output}
                </div>
            </div>
        </main>
    )
}

export default ManageUser;