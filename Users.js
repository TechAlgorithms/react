import React, { Component } from 'react';
const api = require('./api');

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { rows: [], loading: true, saving: false, page: '' };
        this.index = this.index.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this); this.handleCreateUser = this.handleCreateUser.bind(this); this.handleCancel = this.handleCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        api.getUsers().then((result) => {
            this.setState({rows: result.data.result, saving: false, loading: false });
        });
    } 
index() {
        return (<div>
            <div>
                <div className="pull-right">
                    <a href="#" className="btn btn-default" onClick={this.handleCreateUser}>
                        Create User
                    </a>
                </div>
                <h5>Users</h5>
                <table className="table table-condensed">
                    <thead>
                    <tr>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.rows.map(row => this.htmlRow(row))
                    }
                    </tbody>
                </table>
            </div>
        </div>);
    }

    handleEmailChange(e) {
        this.setState({newemail:e.currentTarget.value});
    }

    handleCreateUser(e) {
        this.setState({page:'createUser'});
    }

    handleCancel(e) {
        this.setState({page:''});
    }

    createUser() {
        let busy = this.state.saving == true;

        return (<div><h5>Create User</h5>
            <label>Email</label>&nbsp;
            <input type="text" id="email" onChange={this.handleEmailChange}/>
            <br /> <br />
            <input className="btn btn-primary" type="button" id="btnSave" disabled={busy} value="Save" onClick={this.onSave} />&nbsp;&nbsp;&nbsp;

            <a href="#" className="btn btn-default" onClick={this.handleCancel}>
                Cancel
            </a>
        </div>);
    }

