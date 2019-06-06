/// <reference path="../../built/pxtlib.d.ts" />

import * as React from "react";
import * as data from "./data";
import * as sui from "./sui";
import * as codecard from "./codecard"

type ISettingsProps = pxt.editor.ISettingsProps;

export interface CreateSnippetBuilderState {
    visible?: boolean;
}

export class CreateSnippetBuilder extends data.Component<ISettingsProps, CreateSnippetBuilderState> {
    static cachedFunctionTypes: pxt.FunctionEditorTypeInfo[] = null;

    constructor(props: ISettingsProps) {
        super(props);
        this.state = {
            visible: false,
        };

        this.hide = this.hide.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    hide() {
        this.setState({
            visible: false
        });
    }

    show() {
        pxt.tickEvent('snippetBuilder.show', null, { interactiveConsent: false });
        this.setState({
            visible: true
        });
    }

    cancel() {
        pxt.tickEvent("createfunction.cancel", undefined, { interactiveConsent: true });
        this.hide();
    }

    confirm() {
        this.hide();
    }

    renderCore() {
        const { visible } = this.state;
        const actions: sui.ModalButton[] = [
            {
                label: lf("Cancel"),
                onclick: this.hide,
                icon: "cancel",
                className: "cancel lightgrey"
            },
            {
                label: lf("Done"),
                onclick: this.confirm,
                icon: "check",
                className: "approve positive"
            }
        ];

        return (
            <sui.Modal isOpen={visible} className="snippetBuilder" size="large"
                closeOnEscape={false} closeIcon={false} closeOnDimmerClick={false} closeOnDocumentClick={false}
                dimmer={true} buttons={actions} header={lf("Sprite Wizard")}
            >
                <div>
                    <span className="ui text mobile only paramlabel">{lf("Add a parameter")}</span>
                    <div className="horizontal list">
                    </div>
                    <div id="functionEditorWorkspace"></div>
                </div>
            </sui.Modal>
        )
    }
}