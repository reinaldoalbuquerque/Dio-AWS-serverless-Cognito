const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const params = {
      TableName: 'Items',
      Key: {
        id
      },
      ReturnValues: 'ALL_OLD'
    };

    const result = await dynamodb.delete(params).promise();

    if (!result.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item não encontrado' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deletado com sucesso' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao deletar Item', error })
    };
  }
};
