<If condition={ $.app.isMobile() === true %}
    <div id="prevent_click" className="prevent-click" onClick="$.app.slide_menu()"></div>
</If>
<div className="header-actions entry-options hide_from_client no-padding mobile" id="fna_top_menu">
    <div className="tbl-table tbl-collapse">
        <div className="tbl-row">
            <div className="tbl-data v-align-middle text-center">
                <div className="btn-ipad" onClick="$.app.slide_menu()">
                    <span className="ico icon-list"></span><br />Menu
                </div>
            </div>
            <div className="tbl-data v-align-middle text-center relative">
                <div className="btn-ipad" id="options_dd_menu" onClick="$.app.open_options_menu()">
                    <span className="ico icon-plus"></span><br />Options
                </div>
                <div className="ipad-options-menu" style="display: none;">
                    <div className="arrow arrow-up" id="layer1"></div>
                    <div className="arrow arrow-up" id="layer2"></div>
                    <If condition={!app.isInClientAccessMode() %}
                        {% include 'options_menu' %}
                    </If>
                </div>
            </div>
            <div className="tbl-data text-right w100p v-align-middle">
                <div className="header-states-btn">
                                        <If condition={ user.client_access_enabled === "1" %}
                                                <div className="fna-btn">

                                                        {/* Colored button */}
                                                        <a id="fna_client_access_button" className="toggle_dialog no-underline btn btn-access"><b id="fna_client_access">
                                                                <If condition={ (model.client_access === false||model.client_access.disabled === "1"||model.client_access.status === "DISABLED") %}
                                                                    {app._('CLIENT_ACCESS_DEACTIVATED')}
                                                                {% elseif (model.client_access.status === 'PENDING') %}
                                                                    {app._('CLIENT_ACCESS_PENDING')}
                                                                {% elseif (model.client_access.status === 'EXPIRED') %}
                                                                    {app._('CLIENT_ACCESS_EXPIRED')}
                                                                {% else %}
                                                                    {app._('CLIENT_ACCESS_ACTIVATED')}
                                                                </If></b>
                                                            <span className="btn-arrow">&#9660;</span>
                                                        </a>

                                                        {/* Expanding dialog */}
                                                        <div className="dialog dlg3" id="change_fna_client_access_dialog">
                                                                <div className="dlg-box arrow-box">
                                                                        <div className="gutter">
                                                                                <If condition={ (model.client_access === false||model.client_access.disabled === "1"||model.client_access.status === "DISABLED") %}
                                                                                        <div id="client_access_activate">
                                                                                            <a className="modify_client_access btn no-underline write_only" href="javascript:void(0);">{app._('ACTIVATE_CLIENT_ACCESS')}</a>
                                                                                        </div>
                                                                                {% else %}
                                                                                    <div id="client_access_modify_test">
                                                                                        <div className="nowrap w100p">
                                                                                            <a className="modify_client_access btn no-underline" href="javascript:void(0);">{app._('MODIFY')}</a>
                                                                                            <a className="open_client_access btn no-underline" href="javascript:void(0);">{app._('TEST_CLIENT_ACCESS')}</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </If>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </If>

                    <If condition={ $.app.allowSpousalFNA %}
                        {/* Dropdown type buttons */}
                        <div className="fna-btn">

                            {/* Colored button */}
                            <a id="fna_type_change" className="toggle_dialog hide_from_client no-underline btn btn-type"><b id="fna_type">{app._(['NEW_FNA_TYPE_', model.type].join(''))}</b>
                                <span className="btn-arrow">&#9660;</span></a>

                            {/* Expanding dialog */}
                            <div className="dialog dlg2" id="change_fna_type_dialog">
                                <div className="dlg-box arrow-box">
                                    <div className="gutter">

                                        {/* Change to simple */}
                                        <p id="type_change_simple" className="text-small text-left">
                                            { $.app._('CONFIRM_TYPE_SIMPLE_WARNING')}
                                        </p>

                                        {/* Change to spousal */}
                                        <div id="type_change_spousal">
                                            <p className="text-small margin-bottom-5">{app._('CONFIRM_TYPE_SPOUSAL_WARNING')}</p>
                                            <p className="text-small">{app._('SPOUSE')}: <input type="text" className="small" id="type_change_spouse" size="30"/></p>
                                            <p id="found_in_kronos_crm" className="text-small margin-top-5" style="display:none">
                                                <span className="icon-kronos margin-right-5"></span>{app._('CONTACT_FOUND_IN_KRONOS')} {app.store.getApplicationName()}
                                            </p>
                                        </div>

                                        {/* Change to external spousal */}
                                        <div id="type_change_spousal_external" className="text-left" style="display:none;">
                                            <p className="text-small">{confirm_type_spousal_warning_external}</p>
                                            <p className="text-small">{app._('SPOUSE')}:</p>
                                            <a className="kronos_icon">
                                                <span className="icon-kronos"></span>
                                            </a>
                                            &nbsp;
                                            <strong id="spouse_external_name">{model.spouse_external_name}</strong>
                                        </div>
                                        <div className="save_dialog">
                                            <div className="tbl-table">
                                                <div className="tbl-row">
                                                    <div className="tbl-data w100p text-right">
                                                        <a id="cancel_type_change" href="javascript:void(0);" className="btn btn-cancel no-underline">{app._('CANCEL')}</a>
                                                    </div>
                                                    <div className="tbl-data">
                                                        <input id="confirm_type_change" type="submit" className="btn btn-save" value="{app._('CONFIRM_TYPE_CHANGE')}"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </If>
                    {/* Dropdown status buttons */}
                    <div className="fna-btn">

                        {/* Colored button */}
                        <a id="fna_status_change" className="toggle_dialog hide_from_client no-underline btn btn-state"><b id="fna_status">{app._(['FNA_STATUS_',model.status].join(''))}</b>
                            <span className="btn-arrow">&#9660;</span></a>

                        {/* Expanding dialog */}
                        <div className="dialog dlg1" id="change_fna_status_dialog">
                            <div className="dlg-box arrow-box">
                                <div className="gutter">

                                    <p className="text-small">
                                        {app._('NEW_STATUS')}
                                        <select id="fna_new_status">
                                            <option value="COMPLETED">{app._('COMPLETED')}</option>
                                            <option value="PARTIAL">{app._('PARTIAL')}</option>
                                            <option value="EXPIRED">{app._('EXPIRED')}</option>
                                        </select>
                                    </p>

                                    <div id="completion_warning">
                                        <p className="text-small padding-top-5">{app._('CONFIRM_TYPE_CHANGE_WARNING')}</p>
                                    </div>

                                <div id="conformity_section">
                                    <hr className="spacer dotted"/>

                                        <p className="text-small nowrap">{app._('WILL_EXPIRE_ON')}
                                            <input twig-key="datepicker" type="text" id="fna_expiration_date" name="fna_expiration_date" placeholder="{app._g('DATE_PLACEHOLDER')}" className="write_only_input" value="">
                                        </p>

                                    <div className="relative text-small margin-top-5">
                                        <input type="checkbox" id="fna_confirm_completed" name="fna_confirm_completed" className="checkbox-custom" value="YES" />
                                        <label for="fna_confirm_completed" id="fna_confirm_label" value="YES" className="infos checkbox-custom-label">{app._('CONFIRM_COMPLETED')}</label>
                                        <span id="fna_confirm_completed_hint" className="margin-left-20 v-align-top"></span>
                                    </div>
                                    </div>

                                    <div className="save_dialog">
                                        <hr className="spacer" />
                                        <div className="tbl-table margin-top-10">
                                            <div className="tbl-row">
                                                <div className="tbl-data w100p text-right">
                                                    <a id="cancel_confirmation" href="javascript:void(0);" className="btn btn-cancel no-underline">{app._('CANCEL')}</a>
                                                </div>
                                                <div className="tbl-data">
                                                    <input id="confirm_completed" type="submit" value="{app._('SAVE')}" className="btn btn-save" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>