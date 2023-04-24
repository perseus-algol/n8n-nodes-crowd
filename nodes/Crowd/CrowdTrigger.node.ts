import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class CrowdTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Crowd.dev  Trigger',
		name: 'crowdTrigger',
		icon: 'file:crowd.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when Crowd.dev events occur.',
		defaults: {
			name: 'Crowd.dev Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'crowdApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [

		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				console.log('checkExists');
				// If it did not error then the webhook exists
				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				console.log('create');
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				console.log('delete');
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const headerData = this.getHeaderData() as IDataObject;
		const req = this.getRequestObject();

		const webhookData = this.getWorkflowStaticData('node');

		const result: IDataObject[] = [
			{
				x: 1
			}
		]

		return {
			workflowData: [this.helpers.returnJsonArray(result)],
		};
	}
}
