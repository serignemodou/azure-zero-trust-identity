import * as pulumi from "@pulumi/pulumi";
import * as azuread from "@pulumi/azuread";

const camfaPolicy = new azuread.ConditionalAccessPolicy('caPolicy', {
    displayName: "restrict-access-to-microsoft-admin-portals",
    state: "enabled",
    conditions: {
        userRiskLevels: ["high", "medium"],
        signInRiskLevels: ["high", "medium"],
        clientAppTypes: ["all"],
        applications: {
            includedApplications: [""]  //ID of Microsoft Admin Portals
        },
        locations: {
            includedLocations: ["All"]
        },
        users: {
            includedGroups: [''], //GroupID
        },
    },
    grantControls: {
        operator: "OR",
        builtInControls: ["mfa"]
    }
})