import * as pulumi from "@pulumi/pulumi";
import * as azuread from "@pulumi/azuread";
//import { GroupCreate } from "@iam-beapp/pulumi-own-library";

import {env} from './common'

interface GroupsParams {
    name: string,
    owners: string[],
    members: string[],
}

const groupsParams : Record<string, GroupsParams> = {
    groupEligibleOwnersParams : new pulumi.Config('iam').requireObject<GroupsParams>('groupEligbleOwner'),
    groupEligibleContributorsParams : new pulumi.Config('iam').requireObject<GroupsParams>('groupEligibleContributor'),
    groupEligibleReaderParams : new pulumi.Config('iam').requireObject<GroupsParams>('groupEligbeReader'),
    groupEligibleCostMgtParams : new pulumi.Config('iam').requireObject<GroupsParams>('groupCostManagementReader'),
}


const adGroups = Object.values(groupsParams).map(group => 
    new azuread.Group(`group.name-${env}`, {
        displayName: `group.name-${env}`,
        owners: group.owners,
        members: group.members,
        securityEnabled: true,
    })
)