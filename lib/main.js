"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const github = require('@actions/github');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput('repo-token', { required: true });
            const allowCreate = false; // core.getInput('repo-token', {required: true});
            const client = new github.GitHub(token);
            const context = github.context;
            let labels = getLabels(context.payload.issue.body);
            console.log('adding labels...');
            if (!allowCreate) {
                labels = yield removeUncreatedLabels(client, labels);
            }
            yield addLabels(client, context.payload.issue.number, labels);
            console.log(`done ${labels.length} labels added`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function removeUncreatedLabels(client, labels) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: list } = yield client.issues.listLabelsForRepo({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo
        });
<<<<<<< HEAD
        console.log(list);
=======
        console.log(list)
>>>>>>> 10154810167634a0bd14f2b561034ee962cf66fe
        const labelNames = {};
        list.forEach((elem) => {
            labelNames[elem.name] = true;
        });
        return labels.filter((elem) => labelNames[elem]);
    });
}
function addLabels(client, issueNumber, labels) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.issues.addLabels({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            issue_number: issueNumber,
            labels: labels
        });
    });
}
function getLabels(body) {
    let comentary = false;
    let labels = [];
    body.split('\n').forEach((line) => {
        if (line.includes('<!--')) {
            comentary = true;
        }
        if (line.includes('-->')) {
            comentary = false;
        }
        if (comentary) {
            if ((/\[x\]/i).test(line)) {
                labels.push(line.split(/\[x\]/i)[1].trim());
            }
        }
    });
    return labels;
}
run();