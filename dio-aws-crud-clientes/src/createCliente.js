const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const { id, nome, email, telefone } = JSON.parse(event.body);

    const params = {
      TableName: 'clientes',
      Item: {
        id,
        nome,
        email,
        telefone
      }
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Cliente criado com sucesso' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao criar cliente', error })
    };
  }
};

