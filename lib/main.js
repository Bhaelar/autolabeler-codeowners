"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const getChangedFiles_1 = require("./getChangedFiles");
const github = __importStar(require("@actions/github"));
const getCodeOwnersFromPaths_1 = require("./getCodeOwnersFromPaths");
const getLabelsFromOwners_1 = require("./getLabelsFromOwners");
const applyLabels_1 = require("./applyLabels");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const client = new github.GitHub(core.getInput('githubToken'));
            // get all paths (file paths) changed in the PR
            const paths = yield (0, getChangedFiles_1.getChangedFiles)(github.context, client);
            core.info(`Obtained paths: ${paths}`);
            // paths -> set of codeowners for the paths
            const owners = yield (0, getCodeOwnersFromPaths_1.getCodeOwnersFromPaths)(paths);
            core.info(`Obtained owners for paths: ${Array.from(owners)}`);
            // set of codeowners -> set of labels
            const labels = yield (0, getLabelsFromOwners_1.getLabelsFromOwners)(owners);
            core.info(`Obtained labels for change: ${Array.from(labels)}`);
            // apply the set of labels to the PR
            yield (0, applyLabels_1.applyLabels)(github.context, client, labels);
        }
        catch (error) {
            if (error instanceof Error) {
                core.setFailed(error.message);
            }
        }
    });
}
run();
