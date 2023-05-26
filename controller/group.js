const { GroupModel } = require('../model');

exports.createGroup = async (req, res) => {
    const { parentId, name, orderIndex } = req.body;
    const group = await GroupModel.create({
        parentId,
        name,
        orderIndex,
    });
    res.success(group);
};

exports.updateGroup = async (req, res) => {
    const { id } = req.params;
    const { parentId, name, orderIndex } = req.body;
    const group = await GroupModel.findByPk(id);
    if (!group) {
        res.error('404', 'group not found');
        return;
    }
    await group.update({
        parentId,
        name,
        orderIndex,
    });
    res.success(group);
};

exports.deleteGroup = async (req, res) => {
    const { id } = req.params;
    const group = await GroupModel.findByPk(id);
    if (!group) {
        res.error('404', 'group not found');
        return;
    }
    const children = await GroupModel.findAll({
        where: {
            parentId: id,
        },
    });
    if (children.length > 0) {
        res.error('400', 'group has children');
        return;
    }
    const prompts = await group.getPrompts();
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        const fragments = await prompt.getFragments();
        for (let j = 0; j < fragments.length; j++) {
            const fragment = fragments[j];
            await fragment.destroy();
        }
        await prompt.destroy();
    }
    await group.destroy();
    res.success();
};

exports.getGroup = async (req, res) => {
    const group = await GroupModel.findAll({
        order: [
            ['orderIndex', 'ASC'],
        ],
    });
    res.success(group);
};
