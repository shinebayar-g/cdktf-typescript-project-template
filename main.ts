import { Construct } from 'constructs';
import { App, TerraformStack, TerraformVariable } from 'cdktf';
import { KubernetesProvider } from '@cdktf/provider-kubernetes/lib/provider';
import { Kubernetes } from '@/kubernetes';

class ProdStack extends TerraformStack {
    constructor(scope: Construct, env: string) {
        super(scope, env);

        /**
         * Default providers should be defined in the stack.
         */
        new KubernetesProvider(this, `${env}_kubernetes_provider`, {
            configPath: '~/.kube/config',
            configContext: 'minikube',
        });

        /**
         * Terraform Variables should be defined in the stack, not in the constructs.
         * Otherwise they will have auto generated suffixes in their terraform resource names.
         * `foo` is the name of the variable.
         */
        const var_foo = new TerraformVariable(this, 'foo', {
            type: 'string',
            description: 'Secret variable',
            sensitive: true,
        });

        /**
         * `${env}_kubernetes` will be used as a prefix for all resources in the Kubernetes construct.
         */
        new Kubernetes(this, `${env}_kubernetes`, {
            fooSecret: var_foo,
        });
    }
}

const app = new App();
new ProdStack(app, 'prod');
app.synth();
