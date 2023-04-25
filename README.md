# n8n-nodes-crowd

n8n community node for crowd.dev

[crowd.dev](https://crowd.dev) is an open-source suite of community and data tools built to unlock community-led growth for your organization.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Resources](#resources)   

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Triggers
crowd.dev's n8n node supports two types of triggers: New Activity and New Member.

#### New Activity
This trigger is activated when a new activity happens in your community platforms connected to crowd.dev. For example, someone starred your repo, sent a message in Discord, etc.

You can make this trigger granular. For example, only activate it when someone opens a pull request on GitHub and mentions a specific keyword. On the other side of the spectrum, you can configure this trigger to be a "catch-all", but this setup is not recommended because it will be quite hard to distinguish between different events. So the recommended configuration is to keep this trigger as narrow as possible.

#### New Member
This trigger is activated when a new member joins your community platforms connected to crowd.dev. In crowd.dev, a member is considered anyone who performed at least one action at your community platforms - e.g., joined a Discord server or did something on GitHub (the trigger is activated only once for each user).

This trigger can be configured as a "catch-all" (all new member activities for all active platforms) or only for specific platforms.

### Operations
crowd.dev n8n node supports multiple operations:

#### Activity

- **Create or update activity for a member** - _takes a member object and information about activity and creates or updates an activity for this member in crowd.dev_
- **Create or update activity** - _takes an activity object and creates or updates an activity in crowd.dev based on sourceId of activity and platform_

It's worth noting, that these actions are intended only for activities from custom platforms not supported by crowd.dev. For example, they can be used to automatically creates activities for members who attended a meetup, purchased a swag, etc.

#### Members

- **Create or update member** - _takes a member object and creates or updates a member in crowd.dev_
- **Update member** - _takes a member object and updates an existing member in crowd.dev based on memberId. Fails if the member doesn't exist._
- **Find task** - _returns a member object for an existing member based on memberId. Fails if the member doesn't exist._
- **Delete member** - _deletes an existing member based on memberId. Fails if the member doesn't exist._

#### Organization

- **Create organization** - _creates a new organization in crowd.dev_
- **Update organization** - _updates an existing organization in crowd.dev by `organizationId`. Fails if the organization doesn't exist._
- **Find organization** - _returns a organization object for an existing organization based on `organizationId`. Fails if the organization doesn't exist._
- **Delete organization** - _deletes an existing organization based on `organizationId`. Fails if the organization doesn't exist._

#### Task

- **Create task** - _creates a new task in crowd.dev_
- **Update task** - _updates an existing task in crowd.dev by `taskId`. Fails if the task doesn't exist._
- **Find task** - _returns a task object for an existing task based on `taskId`. Fails if the task doesn't exist._
- **Delete task** - _deletes an existing task based on `taskId`. Fails if the task doesn't exist._

#### Note

- **Create note** - _create a new note in crowd.dev_
- **Update note** - _updates an existing note in crowd.dev by `noteId`. Fails if the note doesn't exist._
- **Find note** - _returns a note object for an existing note based on `noteId`. Fails if the note doesn't exist._
- **Delete note** - _deletes an existing note based on `noteId`. Fails if the note doesn't exist._

## Credentials

To use the crowd.dev n8n node, you first need to get API credentials:

1. Sign up for [crowd.dev](https://app.crowd.dev)
2. Go to [settings](https://app.crowd.dev/settings?activeTab=automations) and grab your `Tenant Id` and `Auth Token`
3. Configure crowd.dev n8n node using credentials from the step above


## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [crowd.dev documentation](https://docs.crowd.dev/docs)
* [crowd.dev API documentation](https://docs.crowd.dev/reference/getting-started-with-crowd-dev-api)
* [crowd.dev settings](https://app.crowd.dev/settings?activeTab=automations)


