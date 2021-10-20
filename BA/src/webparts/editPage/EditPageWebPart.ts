import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EditPageWebPartStrings';
import EditPage from './components/EditPage';
import CheckIn from './components/CheckIn';
import CheckOut from './components/CheckOut';
import { IEditPageProps } from './components/IEditPageProps';

export interface IEditPageWebPartProps {
  description: string;
}

export default class EditPageWebPart extends BaseClientSideWebPart<IEditPageWebPartProps> {

  public render(): void {
    let Page = this.getParameterByName('Page');
    if(Page=="Edit"){
      const element: React.ReactElement<IEditPageProps> = React.createElement(
        EditPage,
        {
          description: this.properties.description,
          context:this.context
        }
      );

      ReactDom.render(element, this.domElement);
    }
    else if(Page=="CheckIn"){
      const element: React.ReactElement<IEditPageProps> = React.createElement(
        CheckIn,
        {
          description: this.properties.description,
          context:this.context
        }
      );

      ReactDom.render(element, this.domElement);
    }
    else if(Page=="CheckOut"){
      const element: React.ReactElement<IEditPageProps> = React.createElement(
        CheckOut,
        {
          description: this.properties.description,
          context:this.context
        }
      );

      ReactDom.render(element, this.domElement);
    }
  }

  public getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
 

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}