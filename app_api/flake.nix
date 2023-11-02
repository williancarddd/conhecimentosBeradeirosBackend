{
  description = "NixOS environment";

  inputs = { nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable"; };

  outputs = { self, nixpkgs, }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShell.${system} = with pkgs;
        mkShell rec {
          packages = [
            android-tools
            nodejs_20
            nodePackages.yarn
            nodePackages.npm
            nodePackages.typescript
            nodePackages.typescript-language-server
            openssl
            pkg-config
          ];
          shellHook = ''
            export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
            export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
            export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          '';

          ANDROID_HOME = "$HOME/Android/Sdk/";
        };
    };
}
