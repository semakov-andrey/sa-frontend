import { eslintRuleFcSorting } from './fc-sorting.rule.js';
import { eslintRuleProgress } from './progress.rule.js';
import { eslintRuleStructure } from './structure.rule.js';

export const eslintPluginSaRules = {
  get rules() {
    return {
      'fc-sorting': eslintRuleFcSorting,
      'progress': eslintRuleProgress,
      'structure': eslintRuleStructure
    };
  }
};
