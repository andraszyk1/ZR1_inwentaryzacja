import ActiveDirectory from 'activedirectory2';
interface ADProperties {
    url: string;
    baseDN: string;
    username: string;
    password: string;
    pageSize?: 1000 | undefined;
    entryParser?: ((entry: object, raw: string, cb: (entry: object) => void) => void) | undefined;
    referrals?: {
        enabled: false;
        exclude: [
            "ldaps?://ForestDnsZones\\..*/.*",
            "ldaps?://DomainDnsZones\\..*/.*",
            "ldaps?://.*/CN=Configuration,.*",
        ];
    } | undefined;
    attributes?: {
        user: [
            "dn",
            "distinguishedName",
            "userPrincipalName",
            "sAMAccountName",
            "mail",
            "lockoutTime",
            "whenCreated",
            "pwdLastSet",
            "userAccountControl",
            "employeeID",
            "sn",
            "givenName",
            "initials",
            "cn",
            "displayName",
            "comment",
            "description",
        ];
        group: [
            "dn",
            "cn",
            "description",
            "distinguishedName",
            "objectCategory",
        ];
    } | undefined;
}
const config:ADProperties = { 
    url: 'ldap://192.168.64.3',
   baseDN: 'OU=Poland,DC=maflow,DC=group',
   username: 'admlandraszyk@maflow.group',
   password: 'Trombone1234!',
   attributes :{
    user: [
        "dn",
        "distinguishedName",
        "userPrincipalName",
        "sAMAccountName",
        "mail",
        "lockoutTime",
        "whenCreated",
        "pwdLastSet",
        "userAccountControl",
        "employeeID",
        "sn",
        "givenName",
        "initials",
        "cn",
        "displayName",
        "comment",
        "description",
    ],
    group: [
      'dn', 'cn', 'description', 'distinguishedName', 'objectCategory'
    ]
  }
   
  };
export const ad=new ActiveDirectory(config);

