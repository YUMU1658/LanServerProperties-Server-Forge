function initializeCoreMod() {
	Opcodes = Java.type("org.objectweb.asm.Opcodes");
	AbstractInsnNode = Java.type("org.objectweb.asm.tree.AbstractInsnNode");
	InsnList = Java.type("org.objectweb.asm.tree.InsnList");
	LabelNode = Java.type("org.objectweb.asm.tree.LabelNode");
	FieldNode = Java.type("org.objectweb.asm.tree.FieldNode");
	InsnNode = Java.type("org.objectweb.asm.tree.InsnNode");
	VarInsnNode = Java.type("org.objectweb.asm.tree.VarInsnNode");
	FieldInsnNode = Java.type("org.objectweb.asm.tree.FieldInsnNode");
	JumpInsnNode = Java.type("org.objectweb.asm.tree.JumpInsnNode");
	TypeInsnNode = Java.type("org.objectweb.asm.tree.TypeInsnNode");
	ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');

	fullPath_LanServerProperties = "rikka/lanserverproperties/LanServerProperties";
	fullPath_ShareToLanScreen = "net/minecraft/client/gui/screens/ShareToLanScreen";
	fullPath_OpenToLanScreenEx = "rikka/lanserverproperties/OpenToLanScreenEx";

	UUIDFixer = "rikka/lanserverproperties/UUIDFixer"

	// methodName: use intermediate names where possible
	return {
		"UUIDUtil.createOfflinePlayerUUID": {
			"target": {
				"type": "METHOD",
				"class": "net/minecraft/core/UUIDUtil",
				"methodName": "m_235879_",
				"methodDesc": "(Ljava/lang/String;)Ljava/util/UUID;"
			},
			"transformer": detour_createOfflinePlayerUUID
		}
	}
}

//	public static UUID createOfflinePlayerUUID(String playerName) {
// +	UUID local_1 = UUIDFixer.hookEntry(playerName);
// +	if (local_1 != null)
// +		return local_1;
//		return ....;
//	}
function detour_createOfflinePlayerUUID(methodNode) {
	var toInject = new InsnList();
	var originalInstructionsLabel = new LabelNode();
	toInject.add(new VarInsnNode(Opcodes.ALOAD, 0)); // playerName
	toInject.add(ASMAPI.buildMethodCall(UUIDFixer, "hookEntry", "(Ljava/lang/String;)Ljava/util/UUID;", ASMAPI.MethodType.STATIC));
	toInject.add(new VarInsnNode(Opcodes.ASTORE, 1));	// Our new UUID, if any
	toInject.add(new VarInsnNode(Opcodes.ALOAD, 1));	// Our new UUID, if any
	toInject.add(new JumpInsnNode(Opcodes.IFNULL, originalInstructionsLabel));
	toInject.add(new VarInsnNode(Opcodes.ALOAD, 1));	// Our new UUID, if any
	toInject.add(new InsnNode(Opcodes.ARETURN));
	toInject.add(originalInstructionsLabel);
	methodNode.instructions.insertBefore(methodNode.instructions.getFirst(), toInject);

	print("[LSP CoreMod] Patched: UUIDUtil.createOfflinePlayerUUID(String)");

	return methodNode;
}
