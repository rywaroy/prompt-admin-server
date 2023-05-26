const { PromptModel, PromptFragmentModel } = require('../model');

exports.createPrompt = async (req, res) => {
    const { groupId, name, model } = req.body;
    const group = await PromptModel.create({
        groupId,
        name,
        model,
    });
    res.success(group);
};

exports.updatePrompt = async (req, res) => {
    const { id } = req.params;
    const { groupId, name, model, fragments = [] } = req.body;
    const prompt = await PromptModel.findByPk(id);
    if (!prompt) {
        res.error('404', 'prompt not found');
        return;
    }
    await prompt.update({
        groupId,
        name,
        model,
    });
    const oldFragments = await prompt.getFragments();
    const deleteFragments = oldFragments.filter((oldFragment) => !fragments.find((fragment) => fragment.id === oldFragment.id));
    for (let i = 0; i < fragments.length; i++) {
        const fragment = fragments[i];
        if (fragment.id) {
            const f = await PromptFragmentModel.findByPk(fragment.id);
            await f.update({
                selected: fragment.selected,
                content: fragment.content,
                orderIndex: fragment.orderIndex,
            });
        } else {
            await prompt.createFragment({
                selected: fragment.selected,
                content: fragment.content,
                orderIndex: fragment.orderIndex,
            });
        }
    }
    for (let i = 0; i < deleteFragments.length; i++) {
        const fragment = deleteFragments[i];
        await fragment.destroy();
    }
    res.success(prompt);
};

exports.deletePrompt = async (req, res) => {
    const { id } = req.params;
    const prompt = await PromptModel.findByPk(id);
    if (!prompt) {
        res.error('404', 'group not found');
        return;
    }
    const fragments = await prompt.getFragments();
    for (let i = 0; i < fragments.length; i++) {
        const fragment = fragments[i];
        await fragment.destroy();
    }
    await prompt.destroy();
    res.success();
};

exports.getPrompt = async (req, res) => {
    const { id } = req.query;
    const data = await PromptModel.findAll({ where: { groupId: id } });
    res.success(data);
};

exports.getPromptById = async (req, res) => {
    const { id } = req.params;
    const data = await PromptModel.findByPk(id, {
        include: [{
            model: PromptFragmentModel,
            as: 'fragments',
        }],
    });
    data.fragments.sort((a, b) => a.orderIndex - b.orderIndex);
    res.success(data);
};
