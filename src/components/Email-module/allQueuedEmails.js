import React from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import EditQueuedEmail from './editQueuedEmails';
import styles from './email.module.css';
import DeleteQueuedEmail from './deleteQueuedEmail';
import { fetchQueuedEmails, getQueuedEmailById } from '../../redux/reducers/emailReducer';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import EditMultiple from './editMultiple'
import 'react-toastify/dist/ReactToastify.css';

class AllQueuedEmails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showEdit: { show: false, id: 0, values: '' }, showDelete: { show: false, id: 0, values: '' }, showMultiEdit: { show: false, id: 0, values: '' } }
        this.handleDeletShow = this.handleDeletShow.bind(this);
    }
    pageNumbers = [];

    componentDidMount() {
        this.getData();
        this.addPagination();

    }

    getData() {
        this.props.fetchQueuedEmails();
    }

    // to add pagination
    addPagination() {
        for (let i = 1; i <= Math.ceil(50 / 10); i++) {
            this.pageNumbers.push(i);
        };
    }

    // get users when change page
    handleChangePage = (id) => {
        this.props.fetchUsersByLimit(id);
    }

    // open modal to edit country
    handleShow(Id) {
        console.log(Id);
        this.props.getQueuedEmailById(Id).then(res => {
            console.log(res);
            if (res.data) {
                toast.success("get course success");
                this.setState({ showEdit: { show: true, id: Id, values: res.data[0] } });
            } else {
                toast.error(res)
            }


        })
    }

    columns = ["S.no", "From Name", "To Name", "Edit", "Edit Multiple", "delete", "select"];

    //  to open delet modal
    handleDeletShow(id) {
        this.setState({ showDelete: { show: true, id: id } });
    }

    handleEditShow(ids) {
        this.setState({ showMultiEdit: { show: true, id: ids } });

    }
    deleteUser = (index) => {
        this.handleDeletShow(index);

        console.log(index);
    }
    ids = [];
    Editids = [];
    handleChecked = (index) => {
        this.ids.push(index);
        console.log(index, this.ids)
    }

    handleEditChecked = (index) => {
        this.Editids.push(index);
        console.log(index, this.Editids)

    }

    // To delete multiple users
    handleDeletAll = () => {
        if (this.ids.length > 0) {

            this.handleDeletShow(this.ids);

        }
    }

    //   edit multiple
    handleEditAll = () => {
        if (this.Editids.length > 0) {
            this.handleEditShow(this.Editids);
        }
    }
    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleDeletAll}>Delete all</Button>
                <Button variant="primary" onClick={this.handleEditAll}>Edit multiple</Button>

                <Table responsive>
                    <thead>
                        <tr>
                            {this.columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.queuedemails.queuedemails ? this.props.queuedemails.queuedemails.map((item, index) => (
                            <tr key={index} onClick={() => console.log(index, item)}>
                                <td>{index + 1}</td>
                                <td>{item.fromName}</td>
                                <td>{item.toName}</td>
                                <td><FaIcons.FaEdit onClick={() => this.handleShow(item.id)} /></td>
                                <td><InputGroup.Checkbox onChange={() => this.handleEditChecked(item.id)} /></td>

                                <td><FaIcons.FaTrash onClick={() => this.deleteUser(item.id)} /></td>
                                <td><InputGroup.Checkbox onChange={() => this.handleChecked(item.id)} /></td>
                            </tr>
                        )) : ""}
                    </tbody>
                </Table>
                <EditQueuedEmail history=''
                    show={this.state.showEdit.show}
                    onHide={() => this.setState({ showEdit: { show: false } })}
                    id={this.state.showEdit.id}
                    values={this.state.showEdit.values}
                />
                <EditMultiple history=''
                    show={this.state.showMultiEdit.show}
                    onHide={() => this.setState({ showMultiEdit: { show: false } })}
                    id={this.state.showMultiEdit.id}
                    values={this.state.showMultiEdit.values}
                />

                <DeleteQueuedEmail history=''
                    show={this.state.showDelete.show}
                    onHide={() => this.setState({ showDelete: { show: false } })}
                    id={this.state.showDelete.id}
                    values={this.state.showDelete.values} />
                <ul id="page-numbers" className={styles.pagesList}>
                    {this.pageNumbers.map((number, index) => {
                        return (<li className={styles.pages}
                            key={index}
                            id={number}
                            onClick={() => this.handleChangePage(number)}
                        >
                            {number}
                        </li>)
                    })
                    }
                </ul>
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        queuedemails: state.queuedemails ? state.queuedemails : []

    }
};
export default connect(mapStateToProps, { fetchQueuedEmails, getQueuedEmailById })(AllQueuedEmails);