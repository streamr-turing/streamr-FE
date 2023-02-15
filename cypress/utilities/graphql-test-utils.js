import { operationName } from "@apollo/client";

export const hasOperationName = (req, operationName) => {
    const { body } = req
    return (
        body.hasOwnProperty('operationName') && body.operationName === operationName
    )
}

export const aliasQuery = (req, operationName) => {
    if (hasOperationName(req, operationName)) {
      req.alias = `gql${operationName}Query`
    }
}

export const aliasBadQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}BadQuery`
  }
}

export const aliasMutation = (req, operationName) => {
    if (hasOperationName(req, operationName)) {
      req.alias = `gql${operationName}Mutation`
    }
  }