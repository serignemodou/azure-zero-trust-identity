import * as pulumi from "@pulumi/pulumi"

export const env = pulumi.getStack();
export const projectName = pulumi.getProject();
export const projectConfig = new pulumi.Config('project');


const azureNativeConfig = new pulumi.Config('azuread');

export const tenantID = azureNativeConfig.require('tenantID');