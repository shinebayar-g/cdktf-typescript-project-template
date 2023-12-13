import { ConfigMap } from '@cdktf/provider-kubernetes/lib/config-map';
import { Secret } from '@cdktf/provider-kubernetes/lib/secret';
import { TerraformVariable } from 'cdktf';
import { Construct } from 'constructs';

interface Opts {
    fooSecret: TerraformVariable;
}

export class Kubernetes extends Construct {
    constructor(scope: Construct, id: string, opts: Opts) {
        super(scope, id);

        /**
        # kubernetes_config_map.prod_kubernetes_foo_991E9F1D (prod_kubernetes/foo) will be created
        + resource "kubernetes_config_map" "prod_kubernetes_foo_991E9F1D" {
            + data = {
                + "foo" = "bar"
              }
            + id   = (known after apply)

            + metadata {
                + generation       = (known after apply)
                + name             = "foo"
                + namespace        = "default"
                + resource_version = (known after apply)
                + uid              = (known after apply)
              }
          }
         */
        new ConfigMap(this, 'foo', {
            metadata: {
                name: 'foo',
            },
            data: {
                foo: 'bar',
            },
        });

        /**
         * Unlike in regular Terraform, resource names in CDKTF cannot be the same for different resource types.
         * Every single resource name must be unique, even though they already generate a random suffix for each resource name.

        # kubernetes_secret.prod_kubernetes_foo2_4BBA12F7 (prod_kubernetes/foo2) will be created
        + resource "kubernetes_secret" "prod_kubernetes_foo2_4BBA12F7" {
            + data                           = (sensitive value)
            + id                             = (known after apply)
            + type                           = "Opaque"
            + wait_for_service_account_token = true

            + metadata {
                + generation       = (known after apply)
                + name             = "foo"
                + namespace        = "default"
                + resource_version = (known after apply)
                + uid              = (known after apply)
              }
          }
         */
        new Secret(this, 'foo2', {
            metadata: {
                name: 'foo',
            },
            data: {
                foo: opts.fooSecret.stringValue,
            },
        });
    }
}
