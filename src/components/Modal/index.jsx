const Modal = (props) => {
    const { id, onPrimaryAction, type, data, title, message, primaryAction } = props;
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{type == "confirm" && title}</h5>
                        <h5 className="modal-title" id="exampleModalLabel">{type == "alert" && "Oops!"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {type == "confirm" && <div className="modal-body">
                        <table className="w-100">
                            <tbody>
                                {Object.keys(data).map((item, index) => {
                                    return (
                                        <tr key={index} className="border-bottom">
                                            <th>{item.toUpperCase()}</th>
                                            <td>{data[item]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
                    {type == "confirm" && <p className="p-2">{message}</p>}
                    {type == "alert" && <p className="p-2 text-danger">{message}</p>}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {type == "confirm" && <button type="button" className="btn btn-primary" onClick={onPrimaryAction}>{primaryAction}</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Modal;