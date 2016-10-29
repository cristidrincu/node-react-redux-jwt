import React from 'react';
import HeadlineTabUser from './headline-tab-user';
import TableWithProps from './table-user-info';

const UserTypeTabsTemplate = (props) => {
    return (
        <div className="col-lg-12">
            <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active"><a href="#resellers" aria-controls="resellers" role="tab" data-toggle="tab">Resellers</a></li>
                <li role="presentation"><a href="#contributors" aria-controls="contributors" role="tab" data-toggle="tab">Contributors</a></li>
                <li role="presentation"><a href="#admins" aria-controls="admins" role="tab" data-toggle="tab">Administrators</a></li>
            </ul>
            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active fade in" id="resellers">
                    <div>
                        <HeadlineTabUser message="This is the resellers tab!" tabUserIdentifier="Reseller" />
                        <TableWithProps {...props.resellers} userType="reseller"/>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="contributors">
                    <div>
                        <HeadlineTabUser message="This is the contributors tab!" tabUserIdentifier="Contributors" />
                        <TableWithProps {...props.contributors} userType="contributor"/>
                    </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="admins">
                    <div>
                        <HeadlineTabUser message="This is the admins tab!" tabUserIdentifier="Administrators"/>
                        <TableWithProps {...props.admins} userType="admin"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTypeTabsTemplate;