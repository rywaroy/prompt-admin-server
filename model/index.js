const GroupModel = require('./group');
const PromptModel = require('./prompt');
const PromptFragmentModel = require('./promptFragment');
const UserModel = require('./user');

GroupModel.hasMany(PromptModel, {
    foreignKey: 'groupId',
    sourceKey: 'id',
    as: 'prompts',
});

PromptModel.belongsTo(GroupModel, {
    foreignKey: 'groupId',
    targetKey: 'id',
    as: 'group',
});

PromptModel.hasMany(PromptFragmentModel, {
    foreignKey: 'promptId',
    sourceKey: 'id',
    as: 'fragments',
});

PromptFragmentModel.belongsTo(PromptModel, {
    foreignKey: 'promptId',
    targetKey: 'id',
    as: 'prompt',
});

module.exports = {
    GroupModel,
    PromptModel,
    PromptFragmentModel,
    UserModel,
};
