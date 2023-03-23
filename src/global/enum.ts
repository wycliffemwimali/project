
  export enum UsersImageType
  {
      ProfileImage=0,
      IdCardImage = 1,

  }


export enum AgentChanged {
    firstName = 0,
    lastName = 1,
    email = 2,
    telephone = 3,
    description = 4,
    agentStreet = 5,
    agentTown = 6,
    agentCity = 7,
    garantorsName = 8,
    garantorsCity = 9,
    garantorsTown = 10,
    garantorsStreet = 11,
    garantorsTelephone = 12,
    agentProfileImage = 13,
    agentPasportImage = 14,
    restart= 15,
    save= 16,
}

export enum EffectChanged {
    label = 0,
    price = 1,
    latlong = 2,
    street = 3,
    town = 4,
    area = 5,
    propertyType = 6,
    dealType = 7,
    description = 8,
    mainEffect = 9,
}
export enum PlatformPower {
    Normal = 0,
    Any = -1,
    Classic = 1,
    Hot = 2,
    Carrousel = 3,
}

export enum CreationStatus {
    pending = 0,
    completed = 1,
    sold = 2,
    unpublished = 2,
    unknown = 3
}