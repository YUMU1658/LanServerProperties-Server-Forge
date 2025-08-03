package rikka.lanserverproperties;

import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.IExtensionPoint;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

@Mod(LanServerProperties.MODID)
public class LanServerProperties {
	public static final String MODID = "lanserverproperties";

	public LanServerProperties() {
		// Make sure servers without this Mod are not recognized as incompatible by the client
		ModLoadingContext.get().registerExtensionPoint(IExtensionPoint.DisplayTest.class,
				() -> new IExtensionPoint.DisplayTest(() -> "ANY", (remote, isServer) -> true)
				);

		MinecraftForge.EVENT_BUS.register(this);
	}

	@SubscribeEvent
	public void onServerStarting(ServerStartingEvent event) {
		// The game will crash if we try to access server properties on an integrated server before it's fully started.
		// However, on a dedicated server, this is the only time we can access the server properties.
		// We can detect whether we are on a dedicated server by checking if the server is not null.
		if (event.getServer() != null) {
			if (!event.getServer().usesAuthentication()) {
				UUIDFixer.tryOnlineFirst = true;
				System.out.println("[LanServerProperties] Offline mode detected, UUID fixer enabled.");
			}
		}
	}
}
